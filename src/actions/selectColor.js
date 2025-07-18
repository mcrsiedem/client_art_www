import axios from "axios";

import { IP } from "../utils/Host";


export function selectColor (etapPlikow,status){

            //druk
            if(grup.proces_nazwa_id ==1){
if (grup.select==true) return style.procesRow_select

                          if (status==4 ) return style.procesRow_tr_DRUK
            // if (status==2) return style.procesRow_tr_RIP
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_ZAS
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 
     return style.procesRow_tr
            }

            //wszystko poza drukiem
            if(grup.proces_nazwa_id !=1){
                          if (status==4 ) return style.procesRow_tr_DRUK
            if (status==2) return style.procesRow_tr_RIP
            if (status==3) return style.procesRow_tr_RIP
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_ZAS
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 
if (grup.select) return style.procesRow_select

     return style.procesRow_tr
            }

  }