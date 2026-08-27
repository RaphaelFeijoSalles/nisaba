package br.com.nisaba.api.erp;

public record SyncRequest(String cursor) {

    public SyncRequest {
        cursor = cursor == null || cursor.isBlank() ? null : cursor.trim();
    }
}
