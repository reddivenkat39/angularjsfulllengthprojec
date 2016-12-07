export interface Invoice{
  INV_NBR;
  INV_MODE;
  VENDOR_NAME;
  EMP_NAME;
  START_DT;
  END_DT;
  INV_DT;
  DUE_DT;
  P_TERM;
  HRS;
  RATE;
  INV_AMT;
  RCVD_AMT;
  BAL_AMT;
  RCVD_DT;
  /*STATUS (open, closed, past due)*/
}
