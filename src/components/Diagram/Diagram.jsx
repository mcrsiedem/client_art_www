import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Layout, 
  Lock, 
  Package, 
  FileText, 
  Settings, 
  Truck, 
  Layers, 
  Box, 
  Info,
  Cpu,
  ArrowRightLeft
} from 'lucide-react';

const Diagram = () => {
  const [expandedNodes, setExpandedNodes] = useState({
    root: true,
    panel: true,
    orders: true
  });

  const toggleNode = (id) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const Card = ({ title, icon: Icon, description, children, id, level = 0 }) => {
    const isExpanded = expandedNodes[id];
    const hasChildren = React.Children.count(children) > 0;

    return (
      <div className={`node-container level-${level}`}>
        <div className="card-wrapper">
          {level > 0 && <div className="connector-horizontal" />}
          
          <div 
            onClick={() => hasChildren && toggleNode(id)}
            className={`card card-level-${level} ${hasChildren ? 'clickable' : ''}`}
          >
            <div className="card-header">
              <div className="icon-box">
                <Icon size={20} />
              </div>
              <span className="card-title">{title}</span>
              {hasChildren && (
                <div className="chevron">
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              )}
            </div>
            {description && <p className="card-description">{description}</p>}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="children-container">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ComponentItem = ({ name, type = "default", detail = "" }) => {
    const icons = {
      process: <Cpu size={14} color="#f97316" />,
      table: <Layout size={14} color="#3b82f6" />,
      transfer: <ArrowRightLeft size={14} color="#22c55e" />,
      default: <div className="dot" />
    };

    return (
      <div className="component-item">
        <div className="component-content">
          {icons[type] || icons.default}
          <span className="component-name">{name}</span>
        </div>
        {detail && <span className="component-detail">{detail}</span>}
      </div>
    );
  };

  return (
    <div className="app-container">
      <style>{`
        .app-container {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
        }
        .content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        header {
          margin-bottom: 48px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.025em;
        }
        .highlight {
          color: #4f46e5;
          font-style: italic;
        }
        .subtitle {
          color: #64748b;
          font-size: 1.125rem;
          max-width: 600px;
        }
        
        /* Drzewo i Karty */
        .node-container {
          display: flex;
          flex-direction: column;
        }
        .level-1, .level-2 {
          margin-left: 32px;
          border-left: 2px solid #e2e8f0;
        }
        .card-wrapper {
          position: relative;
          padding: 12px 16px;
        }
        .connector-horizontal {
          position: absolute;
          left: 0;
          top: 32px;
          width: 16px;
          height: 2px;
          background-color: #e2e8f0;
          margin-left: -16px;
        }
        .card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-radius: 12px;
          transition: all 0.2s ease;
          min-width: 280px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .clickable { cursor: pointer; }
        .card-level-0 {
          background-color: #4f46e5;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
        }
        .card-level-1 {
          background-color: white;
          border: 2px solid #e0e7ff;
        }
        .card-level-1:hover { border-color: #c7d2fe; }
        .card-level-2 {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        .card-level-2:hover { background-color: white; }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-box { display: flex; align-items: center; }
        .card-level-0 .icon-box { color: #c7d2fe; }
        .card-level-1 .icon-box, .card-level-2 .icon-box { color: #6366f1; }
        
        .card-title { font-weight: 700; flex: 1; }
        .card-description {
          font-size: 0.75rem;
          line-height: 1.5;
          margin: 0;
        }
        .card-level-0 .card-description { color: #e0e7ff; }
        .card-level-1 .card-description, .card-level-2 .card-description { color: #64748b; }
        
        .chevron { color: #94a3b8; }
        
        /* Elementy końcowe (komponenty) */
        .component-item {
          margin-left: 48px;
          padding: 8px 16px;
          border-left: 2px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          transition: background 0.2s;
        }
        .component-item:hover { background-color: #f1f5f9; border-radius: 0 8px 8px 0; }
        .component-content {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #334155;
        }
        .component-name { font-size: 0.875rem; font-weight: 500; }
        .component-detail {
          font-size: 11px;
          color: #94a3b8;
          margin-left: 26px;
          margin-top: 2px;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background-color: #cbd5e1; }
        
        footer {
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid #e2e8f0;
          color: #94a3b8;
          font-size: 0.875rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .legend {
          display: flex;
          gap: 24px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #f1f5f9;
        }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
        .swatch { width: 12px; height: 12px; border-radius: 3px; }
      `}</style>

      <div className="content-wrapper">
        <header>
          <div>
            <h1>Mapa Architektury <span className="highlight">Planer</span></h1>
            <p className="subtitle">
              Struktura modułów i komponentów aplikacji w czystym standardzie CSS.
            </p>
          </div>
        </header>

        <div className="tree-root">
          <Card 
            title="Aplikacja Planer (Root)" 
            description="Zarządzanie stanem i autoryzacją."
            icon={Layout} 
            id="root" 
            level={0}
          >
            <Card title="Brama Logowania" description="Dostęp do systemu." icon={Lock} id="login" level={1} />

            <Card title="Panel Administracyjny" description="Główny kontener aplikacji." icon={Settings} id="panel" level={1}>
              
              <Card title="Zamówienia" icon={Package} id="orders" level={2} description="Obsługa zleceń produkcyjnych.">
                <ComponentItem name="Header" detail="Akcje i filtry." />
                <ComponentItem name="TableFx" type="table" detail="Główny widok danych." />
              </Card>

              <Card title="Faktury" icon={FileText} id="invoices" level={2} description="Moduł rozliczeń.">
                <ComponentItem name="Header" />
                <ComponentItem name="TableZamowienia" type="table" detail="Zlecenia do rozliczenia." />
              </Card>

              <Card title="Procesy" icon={Layers} id="processes" level={2} description="Linia produkcyjna.">
                <ComponentItem name="ProcesyHeader" />
                <ComponentItem name="WykonaniaTable" type="table" />
                <ComponentItem name="Procesory" type="process" detail="Silnik stanów." />
              </Card>

              <Card title="Oprawa" icon={Layers} id="binding" level={2} description="Wykończenie produktu.">
                <ComponentItem name="OprawaProcesyHeader" />
                <ComponentItem name="WykonaniaTable" type="table" />
                <ComponentItem name="Procesory" type="process" />
              </Card>

              <Card title="Spedycja" icon={Truck} id="shipping" level={2} description="Wysyłka i logistyka.">
                <ComponentItem name="OddanieHeader" type="transfer" />
                <ComponentItem name="OddanieTable" type="table" />
              </Card>

            </Card>
          </Card>
        </div>

        <footer>
          <p>© 2024 Architektura Systemu</p>
          <div className="legend">
            <div className="legend-item"><div className="swatch" style={{backgroundColor: '#4f46e5'}} /> Rdzeń</div>
            <div className="legend-item"><div className="swatch" style={{backgroundColor: '#f8fafc', border: '1px solid #e2e8f0'}} /> Moduł</div>
            <div className="legend-item"><Cpu size={14} color="#f97316" /> Logika</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Diagram;