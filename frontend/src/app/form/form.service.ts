import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Data} from "./data";
import {environment} from '../../environments/environment';
import {Observable, of} from "rxjs";
import {map, reduce} from "rxjs/operators";
import * as uuid from 'uuid';


@Injectable({providedIn: 'root'})
export class FormService {

  constructor(private http: HttpClient) {
  }

  upsertData(data: Data): Observable<object> {
    console.log(`Sending ${JSON.stringify(data)}`);
    let dataToSend = Object.assign({}, data);
    dataToSend.uuid = uuid.v4();
    return this.http.post(environment.pubSubUrl, {
      "messages": [
        {
          "data": btoa(JSON.stringify(dataToSend))
        }
      ]
    }).pipe(map(response => ({
      messageId: response['messageIds'][0],
      uuid: dataToSend.uuid
    })));
  }

  findByUuid(documentUuid: string): Observable<Data> {
    console.log(`Find by uuid: ${documentUuid}`);
    return this.http.get<any>(`${environment.firestoreUrl}/${documentUuid}`).pipe(map(object =>
      ({
        uuid: object.fields.uuid.stringValue,
        manufacturer: object.fields.manufacturer.stringValue,
        model: object.fields.model.stringValue
      })
    ));
  }

  findAll(): Observable<Data[]> {
    console.log(`Find all`);
    return this.http.get<any>(`${environment.firestoreUrl}`)
      .pipe(map(response => response.documents), reduce((acc, objects) => {
        return acc.concat(objects.map(object =>
          ({
            uuid: object.fields.uuid.stringValue,
            manufacturer: object.fields.manufacturer.stringValue,
            model: object.fields.model.stringValue
          })
        ))
      }, []));
  }

  deleteAll(): Observable<string> {
    console.log(`Delete all`);
    return of('Not implemented...');
  }
}
