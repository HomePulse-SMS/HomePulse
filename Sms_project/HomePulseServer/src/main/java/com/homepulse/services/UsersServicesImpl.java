package com.homepulse.services;

import com.homepulse.daos.guard.GuardDao;
import com.homepulse.daos.users.UsersDao;
import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersServicesImpl implements UsersServices, UserDetailsService{

    @Autowired
    private UsersDao usersDao;

    @Autowired
    private GuardDao guardDao;

    @Lazy
    @Autowired
    private PasswordEncoder pwen;

//    @Override
//    public void addUser(Users users) {
//        usersDao.save(users);
//    }
    
    public Users registerUser(Users user) {
        // Encrypt the password
        user.setPassword(pwen.encode(user.getPassword()));

        // Optional: Normalize role to uppercase (e.g., "ADMIN")
//        user.setRole(user.getRole().toUpperCase());
        user.setRole("USER");
        user.setFlag(false);
        user.setApproval(false);
        // Save the user
        return usersDao.save(user);
    }

//    @Override
//    public void editUsers(Users users, int id) {
//        usersDao.save(users);
//    }

    @Override
    public Users findByEmailAndPassword(String email, String password) {
        return usersDao.findByEmailAndPassword(email,password);
    }

    @Override
    public void markIsVerifiedTrue(int id) {
        int updateRow = guardDao.markIsVerifiedTrue(id);

        if (updateRow ==0) {
            throw new RuntimeException("Visitor Not Found");
        }
    }

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users dbUser = usersDao.findByEmail(email);
        if (dbUser == null)
            throw new UsernameNotFoundException("No user exists!");
        return dbUser;
	}

}
