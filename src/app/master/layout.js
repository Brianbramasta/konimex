import AppLayout from '@/components/layout/AppLayout';
export default function RootLayout({ children }) {
    return (
      <AppLayout>
          {children}
          </AppLayout>
    );
  }