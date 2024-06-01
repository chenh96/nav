package tech.chenh.nav.model;

import lombok.Getter;

@Getter
public class Result<T> {

    private final int code;

    private final String message;

    private final T data;

    private Result(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> Result<T> ok(T data) {
        return new Result<>(200, "OK", data);
    }

    public static Result<Void> err(String message) {
        return new Result<>(500, message, null);
    }

    public static Result<Void> block(String message) {
        return new Result<>(400, message, null);
    }

}
