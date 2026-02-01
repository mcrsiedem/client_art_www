import React, { useContext, useState } from 'react';
import { 
  Plus, 
  FileText, 
  Truck, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Users, 
  Settings 
} from 'lucide-react';
import styles from './Panel2.module.css';
import { useNavigate } from 'react-router-dom';
import Kalkulator from 'pages/Panel/Desktop/Kalkulator/Kalkulator';
import { UIContext } from 'context/UIContext';

const Panel2 = () => {

    const navigate = useNavigate();
       const uiContext = useContext(UIContext);
  
  const sidebarItems = [
    { name: 'ZAMÓWIENIA', icon: <FileText size={18} />, handle:()=> navigate("/Zamowienia") },
    { name: 'FAKTURY', icon: <FileText size={18} /> , handle:()=> navigate("/faktury")},
    { name: 'PROCESY', icon: <Settings size={18} /> , handle:()=> navigate("/ProcesyView")},
    { name: 'OPRAWA', icon: <div className={styles.squareIcon} /> , handle:()=> navigate("/OprawaView")},
    { name: 'SPEDYCJA', icon: <Truck size={18} /> , handle:()=> navigate("/Oddania")},
    { name: 'KALENDARZ', icon: <Calendar size={18} /> , handle:()=> navigate("/kalendarz2")},
    { name: 'USTAWIENIA', icon: <Settings size={18} /> , handle:()=> navigate("/ustawienia")},
    { name: 'STATYSTYKI', icon: <TrendingUp size={18} /> , handle:()=> navigate("/Zestawienia")},
    // { name: 'GRZBIET', icon: <div className={styles.circleIcon} />, handle:()=> navigate("/Zamowienia") },
  ];

  const quickActions = [
    { 
      id: 1, 
      label: 'Nowe Zamówienie', 
      desc: 'Dodaj nowe zamówienie', 
      icon: <Plus size={32} />, 
      glow: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))' 
    },
    { 
      id: 2, 
      label: 'Papiery', 
      desc: 'Dodaj papier', 
      icon: <Zap size={32} />, 
      glow: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))' 
    },
    { 
      id: 3, 
      label: 'Baza Klientów', 
      desc: 'Zarządzaj kontaktami', 
      icon: <Users size={32} />, 
      glow: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))' 
    },
    { 
      id: 4, 
      label: 'Kalkulator do grzbietów', 
      desc: 'Pobierz statystyki PDF', 
      icon: <TrendingUp size={32} />, 
      glow: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.2))' ,
      handle: ()=> {
        uiContext.setShowKalkulatorGrzbietu(true)
        setShowAction(null)

      }
    },
  ];

          const [showActions, setShowAction] = useState(quickActions);


    

  return (
    <div className={styles.container}>
      
      <div className={styles.backgroundSmoke} />
          <div className={styles.overlay} />

                            <header className={styles.header}>
                              <div className={styles.userBadge}>
                                <div className={styles.initialsCircle}>MR</div>
                                <span className={styles.userName}>Maciej Romiszewski</span>
                              </div>

                            </header>

              <main className={styles.mainContent}>
                      <nav className={styles.sidebar}>
                        {sidebarItems.map((item, idx) => (
                          <button key={idx} className={styles.sidebarButton} onClick={()=>item.handle()}>
                            <span className={styles.sidebarIcon}>{item.icon}</span>
                            <span className={styles.sidebarText}>{item.name}</span>
                          </button>
                        ))}
                      </nav>

                      <section className={styles.dashboardSection}>
                                  <header className={styles.welcomeContainer}>
                                    <h2 className={styles.welcomeHeading}>Na skróty...</h2>
                                    {/* <p className={styles.welcomeSubtext}>Szybkie skróty...</p> */}
                                  </header>

                                  <div className={styles.quickActionsGrid}>
                                    {showActions.map((action) => (
                                      <button key={action.id} className={styles.actionCard} onClick={()=>action.handle()}>
                                        <div className={styles.hoverGlow} style={{ background: action.glow }} />
                                        <div className={styles.iconWrapper}>{action.icon}</div>
                                        <div className={styles.textContent}>
                                          <h3 className={styles.actionTitle}>{action.label}</h3>
                                          <p className={styles.actionDesc}>{action.desc}</p>
                                        </div>
                                        <Plus className={styles.cornerIcon} size={16} />
                                      </button>
                                    ))}
                        {uiContext.showKalkulatorGrzbietu && <Kalkulator />}

                                  </div>
                      </section>
              </main>
    </div>
  );
};

export default Panel2;