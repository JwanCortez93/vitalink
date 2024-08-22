import { Gender } from "../types";

export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
