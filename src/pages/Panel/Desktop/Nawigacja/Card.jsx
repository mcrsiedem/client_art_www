import React, { useContext, useRef } from "react";

import styles from "./Card.module.css";
import iconLock from 'assets/iconLock.svg'
import NewNotificationIcon from "./NewNotificationIcon";
import { 
  Plus,  FileText, 
  Truck, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Users, 
  Settings 
} from 'lucide-react';
import { UIContext } from "context/UIContext";


export default function Card({action}) {

        
      
  return (
    
                  // <button key={action.id} className={styles.actionCard} style={{ background: action.glow }}   onClick={()=>action.handle()}>
                  <button key={action.id} className={styles.actionCard}  onClick={()=>action.handle()}>
                                        <div className={styles.hoverGlow} style={{ background: action.glow }} />
                                        {/* <Plus className={styles.cornerIcon} size={16} /> */}
                                        <div className={styles.textContent}>
                                          <h3 className={styles.actionTitle}>{action.label}</h3>
                                          <p className={styles.actionDesc}>{action.desc}</p>
                                     
                                        </div>
                                        <div className={styles.iconWrapper} style={{ background: action.glow }}>{action.icon}</div>
                                      </button>
  );
}
