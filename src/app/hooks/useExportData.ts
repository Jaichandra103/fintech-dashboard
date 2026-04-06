import { useDashboard } from '../context/DashboardContext';
import { toast } from 'sonner';

export function useExportData() {
  const { transactions } = useDashboard();

  const exportToCSV = () => {
    try {
      // Create CSV header
      const headers = ['ID', 'Name', 'Date', 'Category', 'Amount', 'Type', 'Status'];
      
      // Create CSV rows
      const rows = transactions.map((t) => [
        t.id,
        `"${t.name}"`,
        t.date,
        t.category,
        t.amount,
        t.type,
        t.status,
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Transactions exported successfully!');
    } catch (error) {
      toast.error('Failed to export transactions');
      console.error('Export error:', error);
    }
  };

  const exportToJSON = () => {
    try {
      const jsonContent = JSON.stringify(transactions, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Transactions exported successfully!');
    } catch (error) {
      toast.error('Failed to export transactions');
      console.error('Export error:', error);
    }
  };

  return { exportToCSV, exportToJSON };
}
