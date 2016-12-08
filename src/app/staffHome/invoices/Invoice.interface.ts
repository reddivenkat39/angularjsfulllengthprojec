export interface Invoice{
  invNum;
  invMode;
  invStDt;
  invEndDt;
  invDt
  invAmt;
  dueDt;
  pymtTerms;
  wrkHrs;
  rate;
  recvdAmt;
  balAmt;
  recvdDt;
  venId;
  empId;
  venName;
  empName;
  /*STATUS (open, closed, past due)*/
}
