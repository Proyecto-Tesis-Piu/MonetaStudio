import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { BaseService } from '../../Services/base.service'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'observe': 'response'
    })
};

@Injectable({
    providedIn: 'root'
})

export class TransactionService extends BaseService {

    serviceUrl: string = this.baseUrl + "Transactions";

    constructor(private http: HttpClient) { super() }

    public getCategories(token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.get(this.serviceUrl + '/Categories', { headers: tokenHeader });
    }

    public updateCategory(trans: Transaction, token: String) {
        if (trans.userId) {
            var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
            return this.http.post(this.serviceUrl + '/UpdateCategory', trans, { headers: tokenHeader });
        }
        return null;
    }

    public categoryHasTransactions(categoryId: String, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.get(this.serviceUrl + '/Category/HasTransactions/' + categoryId, { headers: tokenHeader });
    }

    public deleteCategory(deletedCategory: String, newCategory: String, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl + '/DeleteCategory', {deletedCategory, newCategory}, { headers: tokenHeader });
    }

    public createCategory(trans: Transaction, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl + '/CreateCategory', trans, { headers: tokenHeader });
    }

    public modifyTransaction(transaction: Transaction, fromDate: Date, toDate: Date, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl + '/Update', { fromDate, toDate, transaction }, { headers: tokenHeader });
    }

    public deleteTransaction(TransactionID: String, fromDate: Date, toDate: Date, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl + '/Delete', { TransactionID, fromDate, toDate }, { headers: tokenHeader });
    }

    public createTransaction(transaction: Transaction, fromDate: Date, toDate: Date, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl + '/Create', { fromDate, toDate, transaction }, { headers: tokenHeader });
    }

    public getTransactions(fromDate: Date, toDate: Date, token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.post(this.serviceUrl, { fromDate, toDate }, { headers: tokenHeader });
    }

    public getCalendarDates(token: String) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.get(this.serviceUrl + '/Calendar', { headers: tokenHeader });
    }
}