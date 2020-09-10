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

    public getCategories() {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.get(this.serviceUrl + '/GetCategories', { headers: tokenHeader });
    }

    public modifyCategory(trans: Transaction) {
        if (trans.userId) {
            var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
            return this.http.put(this.serviceUrl + '/ModifyCategory', trans, { headers: tokenHeader });
        }
        return null;
    }

    public deleteCategory(trans: Transaction) {
        if (trans.userId) {
            var id = trans.id;
            var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
            return this.http.delete(this.serviceUrl + '/DeleteCategory/${id}', { headers: tokenHeader });
        }
        return null;
    }

    public createCategory(trans: Transaction) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.post(this.serviceUrl + '/CreateCategory', trans, { headers: tokenHeader });
    }

    public modifyTransaction(trans: Transaction) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.put(this.serviceUrl + '/Modify', trans, { headers: tokenHeader });
    }

    public deleteTransaction(trans: Transaction) {
        var id = trans.id;
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.delete(this.serviceUrl + '/Delete/${id}', { headers: tokenHeader });
    }

    public createTransaction(trans: Transaction) {
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.post(this.serviceUrl + '/Create', trans, { headers: tokenHeader });
    }

    public getTransactions(fromDate: Date, toDate: Date) {
        var dates;
        dates.fromDate = fromDate;
        dates.toDate = toDate;
        var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        return this.http.post(this.serviceUrl, dates, { headers: tokenHeader });
    }
}