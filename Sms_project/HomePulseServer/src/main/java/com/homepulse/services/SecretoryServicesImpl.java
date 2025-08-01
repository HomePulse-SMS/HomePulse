package com.homepulse.services;

import com.homepulse.daos.guard.GuardDao;
import com.homepulse.daos.secretory.SecretoryDao;
import com.homepulse.entities.VisitorLogs;
import com.homepulse.entities.userEmpSecretory.Users;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SecretoryServicesImpl implements SecretoryServices {

    @Autowired
    private SecretoryDao secretoryDao;
    @Autowired
    private GuardDao guardDao;

    @Override
    public List<Users> findAll() {
        return secretoryDao.findAll();
    }

    @Override
    public List<Users> findByRole(String role) {
        return secretoryDao.findByRole(role);
    }

    @Override
    public List<Users> findByApprovalFalse() {
        return secretoryDao.findByApprovalFalse();
    }

    @Override
    public List<Users> findByApprovalTrue() {
        return secretoryDao.findByApprovalTrue();
    }

    @Override
    public List<Users> findByWing(String wing) {
        return secretoryDao.findByWing(wing);
    }

    @Override
    public void approveUser(int id) {
        int updatedRows = secretoryDao.approveUserById(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void disapproveUser(int id) {
        int updatedRows = secretoryDao.disapproveUserById(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public void deleteUser(int id) {
        int updatedRows = secretoryDao.deleteUser(id);
        if (updatedRows == 0) {
            throw new RuntimeException("User Not Found");
        }
    }

    @Override
    public List<Users> findBySocietyId(int id) {
        return secretoryDao.findBySocietyId_Id(id);
    }

    @Override
    public List<VisitorLogs> findAllVisitor() {
        return guardDao.findAll();
    }

    @Override
    public VisitorLogs findById(int id) {
        return guardDao.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not found"));
    }

    @Override
    public List<VisitorLogs> findByType(String type) {
        return guardDao.findByType(type);
    }

    @Override
    public List<VisitorLogs> findByUsersId_Id(int usersIdId) {
        return guardDao.findByUsersId_Id(usersIdId);
    }

    @Override
    public List<VisitorLogs> findByGuardId_Id(int guardIdId) {
        return guardDao.findByGuardId_Id(guardIdId);
    }


}
