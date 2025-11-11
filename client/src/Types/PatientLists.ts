export interface IPatientDetail {
    Dob: Date;
    EDD: Date;
    GPAL: string;
    GestationAge: string;
    HighRisk: string;
    LMP: Date;
    age: number;
    bloodGroup: string;
    contact: string;
    id: string;
    imgUrl?: string;
    lastMonitored: Date;
    name: string;
    pregnancyType: string;
    status: string;
}
export interface IVital {
    RespirationRate: string;
    Temperature: string;
    bloodOxygenLevel: string;
    heartRate: string;
    id: string;
    patientId: string;
    timeMonitored: Date;
}
export interface IPatientDetails extends IPatientDetail {
    Vitals: IVital[]
}