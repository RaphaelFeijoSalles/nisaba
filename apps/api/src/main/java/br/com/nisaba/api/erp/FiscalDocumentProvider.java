package br.com.nisaba.api.erp;

public interface FiscalDocumentProvider {

    SyncPage fetchDocuments(SyncRequest request);
}
