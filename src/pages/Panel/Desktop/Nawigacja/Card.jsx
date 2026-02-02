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


export default function Card() {
    const quickActions = [
      { 
        id: 1, 
        label: 'Nowe Zamówienie', 
        desc: 'Dodaj nowe zamówienie', 
        icon: <Plus size={32} />, 
        glow: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))' ,
        handle: ()=> console.log("o")
      },
      { 
        id: 2, 
        label: 'Papiery', 
        desc: 'Dodaj papier', 
        icon: <Zap size={32} />, 
        glow: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))' ,
        handle: ()=> console.log("o")
      },
      { 
        id: 3, 
        label: 'Baza Klientów', 
        desc: 'Zarządzaj kontaktami', 
        icon: <Users size={32} />, 
        glow: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))' ,
        handle: ()=> console.log("o")
      },
      { 
        id: 4, 
        label: 'Kalkulator do grzbietów', 
        desc: 'Pobierz statystyki PDF', 
        icon: <TrendingUp size={32} />, 
        glow: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.2))' ,
        handle: ()=>  uiContext.setShowKalkulatorGrzbietu(!uiContext.showKalkulatorGrzbietu)
    
      },
    ];
    const action =   { 
      id: 4, 
        label: 'Kalkulator do grzbietów', 
        desc: 'Policz grubość grzbietu', 
        icon: <TrendingUp size={32} />, 
        glow: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.2))' ,
        handle: ()=>  uiContext.setShowKalkulatorGrzbietu(!uiContext.showKalkulatorGrzbietu)
      }
         const uiContext = useContext(UIContext);
      
  return (
    
                  <button key={action.id} className={styles.actionCard} onClick={()=>action.handle()}>
                                        <div className={styles.hoverGlow} style={{ background: action.glow }} />
                                        <div className={styles.iconWrapper}>{action.icon}</div>
                                        <div className={styles.textContent}>
                                          <h3 className={styles.actionTitle}>{action.label}</h3>
                                          <p className={styles.actionDesc}>{action.desc}</p>
                                        </div>
                                        <Plus className={styles.cornerIcon} size={16} />
                                      </button>
  );
}
