package tech.chenh.nav.exception;

public class MessagedException extends RuntimeException {

    public MessagedException(String message) {
        super(message);
    }

    public MessagedException(String message, Throwable cause) {
        super(message, cause);
    }

}