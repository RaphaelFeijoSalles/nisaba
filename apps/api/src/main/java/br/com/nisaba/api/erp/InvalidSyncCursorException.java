package br.com.nisaba.api.erp;

public class InvalidSyncCursorException extends RuntimeException {

    public InvalidSyncCursorException(String cursor) {
        super("cursor not supported for fixture sync: " + cursor);
    }
}
