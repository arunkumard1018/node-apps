# com.strix.app
{
    "id": "105174437335562650655",
    "email": "arunkumard1018@gmail.com",
    "verified_email": true,
    "name": "Arunkumar D_4GM19EC402",
    "given_name": "Arunkumar",
    "family_name": "D_4GM19EC402",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocLlyyKChafPm689jIB7bikrNTxobFRKh8T0yNwBoRYUHDZ8noQ=s96-c"
}

Business {
    name : string;
    catagory : string;
    GSTIN: string;
    hsn: number;
    street : string;
    city: string;
    state : string;
    zip: number;
}

Invoice {
    invoiceNo: String;
    invoiceDate: Date;
    invoiceTo: {
        name : String;
        Address:{city:String}
    }
    paymentStatus : PAID : PROCESSING
    paymentMethod: NEFT/CASH/UPI/DEBIT CARD
    totalAmount: Number;
}
