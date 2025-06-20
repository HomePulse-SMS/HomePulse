package com.homepulse.restcontrollers;

import com.homepulse.entities.VisitorLogs;
import com.homepulse.services.GuardServices;
import com.homepulse.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/guard")
@RestController
public class GuardRestController {

    @Autowired
    private GuardServices guardServices;

    @PostMapping("/addVisitor")
    public ResponseUtil<?> addVisitor(@RequestBody VisitorLogs visitorLogs) {
        guardServices.addVisitor(visitorLogs);
        return ResponseUtil.apiSuccess("New Visitor Added");
    }

    @GetMapping("/notExited")
    public ResponseUtil<?> findByExitTimeIsNull() {
        List<VisitorLogs> list = guardServices.findByExitTimeIsNull();
        return ResponseUtil.apiSuccess(list);
    }

    @PatchMapping("/markExit/{id}")
    public ResponseUtil<?> updateExitTimeById(@PathVariable("id") int id) {
        guardServices.updateExitTimeById(id);
        return ResponseUtil.apiSuccess("Marked as Exited");
    }

    @GetMapping("/notUserVerified")
    public ResponseUtil<?> findByVerifiedIsFalse() {
        List<VisitorLogs> list = guardServices.findByVerifiedIsFalse();
        return  ResponseUtil.apiSuccess(list);
    }
}
