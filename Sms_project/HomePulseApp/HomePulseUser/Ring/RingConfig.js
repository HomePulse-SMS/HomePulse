import React, {useEffect, useState} from "react";
import {getDatabase, off, onValue, ref, update} from "firebase/database";
import {app} from "../firebaseConfig";
import CallAlert from "./Ring";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RingConfig(){
    const [alertData, setAlertData] = useState({ visible: false, name: '', photo: '' });

    const database = getDatabase(app);
    const [wing, setWing] = useState('');
    const [flat, setFlat] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const parsed = JSON.parse(storedData);
                    console.log("Loaded userData:", parsed);

                    // Adjust keys based on how you saved them
                    setWing(parsed.wing);
                    setFlat(parsed.roomNo || '');
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        if (!wing || !flat) return;

        const visitorRef = ref(database, `visitorAlerts/${wing}_${flat}`);

        const onVisitorReceived = (snapshot) => {
            const data = snapshot.val();
            if (data && data.allowed==='!') {
                console.log(data);
                setAlertData({ visible: true, name: data.name, photo: data.photo });
            }
        };

        onValue(visitorRef, onVisitorReceived);

        return () => {
            off(visitorRef, 'value', onVisitorReceived);
        };
    }, []);
    const handleAllow = () => {
        setAlertData(prev => ({ ...prev, visible: false }));

        const visitorRef = ref(database, `visitorAlerts/${wing}_${flat}`);
        update(visitorRef, { allowed: true });
    };

    const handleDeny = () => {
        setAlertData(prev => ({ ...prev, visible: false }));

        const visitorRef = ref(database, `visitorAlerts/${wing}_${flat}`);
        update(visitorRef, { allowed: false });
    };

    return(
        <CallAlert
            visible={alertData.visible}
            name={alertData.name}
            photo={alertData.photo}
            onAllow={handleAllow}
            onDeny={handleDeny}
        />
    )
}
