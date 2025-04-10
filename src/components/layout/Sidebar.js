/**
 * Sidebar Component
 * Fixed position sidebar that displays menu and submenu items with active menu indicators
 * Responsive design that collapses on mobile devices
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FiMenu, FiX, FiHome, FiDatabase, FiTruck, FiCalendar, 
  FiFileText, FiSettings, FiChevronDown, FiChevronRight 
} from 'react-icons/fi';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Handle window resize to determine if mobile view should be used
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Toggle sidebar open/closed state
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Toggle menu expansion
   * @param {string} menuKey - The key of the menu to toggle
   */
  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  /**
   * Check if a menu item or its children are active
   * @param {string} path - The path to check
   * @param {Array} subItems - Optional submenu items to check
   * @returns {boolean} - True if the menu item is active
   */
  const isMenuActive = (path, subItems = []) => {
    if (pathname === path) return true;
    if (subItems.length > 0) {
      return subItems.some(item => pathname.startsWith(item.path));
    }
    return pathname.startsWith(path) && path !== '/';
  };

  // Define menu structure
  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <FiHome />,
    },
    {
      key: 'master',
      label: 'Master Data',
      icon: <FiDatabase />,
      subItems: [
        { key: 'branch', label: 'Cabang', path: '/master/branch' },
        { key: 'role', label: 'Role/Jabatan', path: '/master/role' },
        { key: 'employee', label: 'Karyawan', path: '/master/employee' },
        { key: 'hotel', label: 'Hotel', path: '/master/hotel' },
        { key: 'room-type', label: 'Tipe Kamar', path: '/master/room-type' },
        { key: 'ticket', label: 'Tiket', path: '/master/ticket' },
        { key: 'vehicle-type', label: 'Jenis Kendaraan', path: '/master/vehicle-type' },
        { key: 'vehicle', label: 'Kendaraan', path: '/master/vehicle' },
        { key: 'plafon', label: 'Plafon', path: '/master/plafon' },
        { key: 'mess-room', label: 'Kamar Mess', path: '/master/mess-room' },
        { key: 'city', label: 'Kota', path: '/master/city' },
        { key: 'supplier', label: 'Supplier', path: '/master/supplier' },
      ],
    },
    {
      key: 'transaction',
      label: 'Transaksi',
      icon: <FiTruck />,
      subItems: [
        { key: 'order', label: 'Pesanan/Permintaan Dinas', path: '/transaction/order' },
        { key: 'driver-schedule', label: 'Penjadwalan Driver', path: '/transaction/driver-schedule' },
        { key: 'fuel', label: 'Permintaan BBM', path: '/transaction/fuel' },
        { key: 'mess', label: 'Permintaan Mess', path: '/transaction/mess' },
        { key: 'evaluation', label: 'Evaluasi', path: '/transaction/evaluation' },
        { key: 'purchase', label: 'Pembelian', path: '/transaction/purchase' },
        { key: 'return', label: 'Retur Pembelian', path: '/transaction/return' },
      ],
    },
    {
      key: 'report',
      label: 'Laporan',
      path: '/report',
      icon: <FiFileText />,
    },
    {
      key: 'settings',
      label: 'Pengaturan',
      icon: <FiSettings />,
      subItems: [
        { key: 'order-approval', label: 'Setting Approval Pesanan', path: '/settings/order-approval' },
        { key: 'mess-approval', label: 'Setting Approval Mess', path: '/settings/mess-approval' },
      ],
    },
  ];

  // Auto-expand menu based on current path
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.subItems && item.subItems.some(subItem => pathname.startsWith(subItem.path))) {
        setExpandedMenus(prev => ({ ...prev, [item.key]: true }));
      }
    });
  }, [pathname]);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden mt-16`}
      >
        <div className="h-full overflow-y-auto py-4">
          <nav className="px-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = isMenuActive(item.path, item.subItems);
                const isExpanded = expandedMenus[item.key];

                return (
                  <li key={item.key}>
                    {item.subItems ? (
                      <>
                        <button
                          className={`flex items-center w-full px-4 py-2 text-left rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                          onClick={() => toggleMenu(item.key)}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                          {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                        </button>

                        {isExpanded && (
                          <ul className="mt-1 ml-6 space-y-1">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.key}>
                                <Link 
                                  href={subItem.path}
                                  className={`block px-4 py-2 rounded-md ${pathname === subItem.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;