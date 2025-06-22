package org.com.wiki.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // 409 Conflict
public class DuplicateTitleException extends RuntimeException {
    public DuplicateTitleException(String message) {
        super(message);
    }
}
