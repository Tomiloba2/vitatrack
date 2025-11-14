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
    respiration_rate: string;
    temperature: string;
    blood_oxygen: string;
    heart_rate: string;
    id: string;
    patient_id: string;
    time_monitored: Date;
}
export interface IPatientDetails extends IPatientDetail {
    Vitals: IVital[]
}