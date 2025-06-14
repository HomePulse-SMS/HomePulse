package com.homepulse.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.logging.log4j.message.StringFormattedMessage;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@Data
public class ResponseUtil<T> {
    private String status;
    private String message;
    private T data;

    public static <T> ResponseUtil<T> apiSuccess(T data) {
        ResponseUtil<T> result = new ResponseUtil<T>("Success", null, data);
        return  result;
    }

    public static <T> ResponseUtil<T> apiError(String message) {
        ResponseUtil<T> result = new ResponseUtil<T>("Error", message, null);
        return  result;
    }
}
