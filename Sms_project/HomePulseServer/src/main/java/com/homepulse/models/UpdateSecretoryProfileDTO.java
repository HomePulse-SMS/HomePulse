package com.homepulse.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class UpdateSecretoryProfileDTO {
    private String fname;
    private String lname;
    private String contact;
}
