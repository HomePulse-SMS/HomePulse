package com.homepulse.services;

import com.homepulse.entities.VisitorLogs;

import java.util.List;

public interface GuardServices {

    void addVisitor(VisitorLogs visitorLogs);
    List<VisitorLogs> findByExitTimeIsNull();
    void updateExitTimeById(int id);

    List<VisitorLogs> findByVerifiedIsFalse();

}
