import { useAppStore } from '../store/useAppStore';

const translations = {
  en: {
    // General
    english: "English",
    italian: "Italian",
    // Home Header
    greeting: "Good Morning,",
    restaurant_name_fallback: "THE GOLDEN BISTRO",
    // Settings
    settings_title: "Settings",
    language_title: "Language",
    language_subtitle: "Choose your preferred language",
    notifications: "Notifications",
    security: "Security",
    help_support: "Help & Support",
    about: "About",
    sign_out: "Sign Out",
    // Settings Sections
    account_settings: "ACCOUNT SETTINGS",
    manage_subscription: "Manage Subscription",
    notification_settings: "Notification Settings",
    change_password: "Change Password",
    two_factor_auth: "Two-Factor Authentication",
    support_legal: "SUPPORT & LEGAL",
    terms_conditions: "Terms & Conditions",
    privacy_policy: "Privacy Policy",
    help_center: "Help Center",
    // Documents
    documents_title: "Documents",
    upload_invoice: "Upload Invoice",
    recent_documents: "Recent Documents",
    review: "Review",
    view: "View",
    no_documents: "No documents found",
    no_documents_subtext: "Upload an invoice to get started",
    items: "ITEMS",
    status_processed: "Processed",
    status_pending: "Pending Review",
    // Document Details
    document_details_title: "Document Details",
    success: "Success",
    document_updated: "Document updated successfully.",
    error: "Error",
    document_update_failed: "Failed to update document.",
    delete_document_title: "Delete Document",
    delete_document_msg: "Are you sure you want to delete this document? This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    document_delete_failed: "Failed to delete document. Please try again.",
    download_success: "Downloaded successfully to your selected folder.",
    download_failed: "Failed to download file.",
    document_preview: "Document Preview",
    invoice: "INVOICE",
    document_information: "Document Information",
    supplier_name: "Supplier Name",
    invoice_number: "Invoice Number",
    total_amount: "Total Amount",
    invoice_date: "Invoice Date",
    vat_amount: "VAT Amount",
    upload_date: "Upload Date",
    extracted_data: "Extracted Data",
    product_name: "Product Name",
    qty: "Qty",
    edit_data: "Edit Data",
    update_data: "Update",
    // Analytics & Home Additions
    analytics_title: "Analytics",
    add_daily_data: "Add Daily Data",
    expenses: "Expenses",
    cash: "Cash",
    no_recent_activity: "No recent activity",
    just_now: "JUST NOW",
    risto_ai_insight: "RISTO AI INSIGHT",
    insight_fallback_text: "Food cost increased by 12% this week compared to the previous period.",
    view_insight: "View Insight",
    live_sync: "Live sync",
    weekly_revenue_trend: "Weekly Revenue Trend",
    monthly_revenue_trend: "Monthly Revenue Trend",
    last_7_days: "Last 7 Days",
    current_month: "Current Month",
    revenue_trend: "Revenue Trend",
    last_week: "Last Week",
    revenue_comparison: "Revenue Comparison",
    covers_activity: "Covers Activity",
    cost_percentage: "Cost %",
    supplier_price_alerts: "Supplier Price Alerts",
    no_price_alerts: "No price alerts at this time",
    price_alert: "Price Alert",
    impact: "Impact: ",
    calculating: "Calculating...",
    // Chat
    chat_title: "AI Chat",
    chat_placeholder: "Ask AI about your restaurant business...",
    // Period Dropdown
    weekly: "Weekly",
    monthly: "Monthly",
    export_data: "Export Data",
    // Home Actions
    add_expense: "Add Expense",
    scan_invoice: "Scan Invoice",
    new_report: "New Report",
    invite_staff: "Invite Staff",
    // Quick Actions
    quick_actions: "Quick Actions",
    // Recent Activity
    recent_activity: "Recent Activity",
    see_all: "See All",
    // Cash Management
    cash_management: "Cash Management",
    cash_available: "Cash Available",
    withdrawals: "Withdrawals",
    bank_deposits: "Bank Deposits",
    total_collected: "Total Collected",
    recent_deposits: "Recent Deposits",
    // VAT Balance
    estimated_vat: "Estimated VAT Balance",
    vat_payable: "VAT Payable",
    vat_receivable: "VAT Receivable",
    // Charts
    revenue_trends: "Revenue Trends",
    // AI Insight
    ai_insights: "AI Insights",
  },
  it: {
    // General
    english: "Inglese",
    italian: "Italiano",
    // Home Header
    greeting: "Buongiorno,",
    restaurant_name_fallback: "IL BISTRO D'ORO",
    // Settings
    settings_title: "Impostazioni",
    language_title: "Lingua",
    language_subtitle: "Scegli la tua lingua preferita",
    notifications: "Notifiche",
    security: "Sicurezza",
    help_support: "Aiuto e Supporto",
    about: "Informazioni",
    sign_out: "Esci",
    // Settings Sections
    account_settings: "IMPOSTAZIONI ACCOUNT",
    manage_subscription: "Gestisci Abbonamento",
    notification_settings: "Impostazioni Notifiche",
    change_password: "Cambia Password",
    two_factor_auth: "Autenticazione a Due Fattori",
    support_legal: "SUPPORTO E LEGALE",
    terms_conditions: "Termini e Condizioni",
    privacy_policy: "Normativa sulla Privacy",
    help_center: "Centro Assistenza",
    // Documents
    documents_title: "Documenti",
    upload_invoice: "Carica Fattura",
    recent_documents: "Documenti Recenti",
    review: "Revisiona",
    view: "Visualizza",
    no_documents: "Nessun documento trovato",
    no_documents_subtext: "Carica una fattura per iniziare",
    items: "ARTICOLI",
    status_processed: "Elaborato",
    status_pending: "In Revisione",
    // Document Details
    document_details_title: "Dettagli Documento",
    success: "Successo",
    document_updated: "Documento aggiornato con successo.",
    error: "Errore",
    document_update_failed: "Impossibile aggiornare il documento.",
    delete_document_title: "Elimina Documento",
    delete_document_msg: "Sei sicuro di voler eliminare questo documento? Questa azione non può essere annullata.",
    cancel: "Annulla",
    delete: "Elimina",
    document_delete_failed: "Impossibile eliminare il documento. Riprova.",
    download_success: "Scaricato con successo nella cartella selezionata.",
    download_failed: "Impossibile scaricare il file.",
    document_preview: "Anteprima Documento",
    invoice: "FATTURA",
    document_information: "Informazioni Documento",
    supplier_name: "Nome Fornitore",
    invoice_number: "Numero Fattura",
    total_amount: "Importo Totale",
    invoice_date: "Data Fattura",
    vat_amount: "Importo IVA",
    upload_date: "Data Caricamento",
    extracted_data: "Dati Estratti",
    product_name: "Nome Prodotto",
    qty: "Qtà",
    edit_data: "Modifica Dati",
    update_data: "Aggiorna",
    // Analytics & Home Additions
    analytics_title: "Statistiche",
    add_daily_data: "Aggiungi Dati Giornalieri",
    expenses: "Spese",
    cash: "Cassa",
    no_recent_activity: "Nessuna attività recente",
    just_now: "APPENA ORA",
    risto_ai_insight: "APPROFONDIMENTO RISTO AI",
    insight_fallback_text: "Il costo del cibo è aumentato del 12% questa settimana rispetto al periodo precedente.",
    view_insight: "Vedi Approfondimento",
    live_sync: "Sincronizzazione live",
    weekly_revenue_trend: "Andamento Entrate Settimanale",
    monthly_revenue_trend: "Andamento Entrate Mensile",
    last_7_days: "Ultimi 7 Giorni",
    current_month: "Mese Corrente",
    revenue_trend: "Andamento Entrate",
    last_week: "Settimana Scorsa",
    revenue_comparison: "Confronto Entrate",
    covers_activity: "Attività Coperti",
    cost_percentage: "Costo %",
    supplier_price_alerts: "Avvisi Prezzi Fornitori",
    no_price_alerts: "Nessun avviso sui prezzi al momento",
    price_alert: "Avviso Prezzo",
    impact: "Impatto: ",
    calculating: "Calcolo in corso...",
    // Chat
    chat_title: "Chat AI",
    chat_placeholder: "Chiedi all'IA del tuo ristorante...",
    // Period Dropdown
    weekly: "Settimanale",
    monthly: "Mensile",
    export_data: "Esporta Dati",
    // Home Actions
    add_expense: "Aggiungi Spesa",
    scan_invoice: "Scansiona Fattura",
    new_report: "Nuovo Report",
    invite_staff: "Invita Staff",
    // Quick Actions
    quick_actions: "Azioni Rapide",
    // Recent Activity
    recent_activity: "Attività Recenti",
    see_all: "Vedi Tutti",
    // Cash Management
    cash_management: "Gestione Cassa",
    cash_available: "Cassa Disponibile",
    withdrawals: "Prelievi",
    bank_deposits: "Depositi Bancari",
    total_collected: "Totale Incassato",
    recent_deposits: "Depositi Recenti",
    // VAT Balance
    estimated_vat: "Bilancio IVA Stimato",
    vat_payable: "IVA a Debito",
    vat_receivable: "IVA a Credito",
    // Charts
    revenue_trends: "Tendenze delle Entrate",
    // AI Insight
    ai_insights: "Approfondimenti AI",
  }
};

export type TranslationKey = keyof typeof translations.en;

export const t = (key: TranslationKey): string => {
  const language = useAppStore.getState().appLanguage || 'en';
  return translations[language]?.[key] || translations.en[key] || key;
};

export const useTranslation = () => {
  const language = useAppStore((state) => state.appLanguage) || 'en';
  
  const tHook = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };
  
  return { t: tHook };
};
