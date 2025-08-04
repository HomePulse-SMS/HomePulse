import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Page2 from "./SocietyCreation/Page2";
import Page1 from "./SocietyCreation/Page1";
import Page3 from "./SocietyCreation/Page3";

const CreateSociety = () => {

    const [page,setPage] = useState(0);
    const [id,setId] = useState(0);
    const [sname, setSname] = useState("");
    const [subcity, setSubCity] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const savedAdmin =async(uid,u,p)=>{
        await fetch("http://172.18.4.222:8080/admin/addSecretory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: u,
                password:p,
                society:{
                    id:uid,
                }
            })
        }).then(async (res) => {
            //const response = await res.json();
            //let id = response.data.id;
            //savedAdmin(id);
        })
            .catch((error) => console.error("Error:", error));
    }

    const savedMe =async (u,p) => {
            await fetch("http://172.18.4.222:8080/admin/addSociety", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sname: sname,
                    subcity:subcity,
                    location:{
                        id:id,
                    }
                })
            }).then(async (res) => {
                const response = await res.json();
                let id = response.data.id;
                await savedAdmin(id, u, p);
            })
                .catch((error) => console.error("Error:", error));
        }

    const changePage = change => {
        setPage(change);
    }

    const getId = id =>{
        setId(id);
        console.log(id);
    }

    const details = detail =>{
        console.log(detail);
        setSname(detail.sname);
        setSubCity(detail.address);
    }

    const getEmail = em =>{ setEmail(em); }
    const getPassword = pwd =>{ setPass(pwd); }


    return (
        <SafeAreaView style={styles.container}>
            {
                page === 0 ? <Page1 page={changePage} id={getId}/>:null
            }
            {
                page === 1 ?<Page2 page={changePage} details={details} />:null
            }
            {
                page === 2 ?<Page3 page={changePage} saved={savedMe} />:null
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 }
});

export default CreateSociety;
