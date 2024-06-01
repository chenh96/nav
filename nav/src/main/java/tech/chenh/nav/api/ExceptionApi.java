package tech.chenh.nav.api;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tech.chenh.nav.exception.MessagedException;
import tech.chenh.nav.model.Result;

@RequestMapping("exception")
@RestControllerAdvice
@RestController
public class ExceptionApi {

    @RequestMapping("security")
    public Result<Void> securityException() {
        return Result.block("请先登录");
    }

    @ExceptionHandler(MessagedException.class)
    public Result<?> messagedException(MessagedException e) {
        return Result.err(e.getMessage());
    }

}