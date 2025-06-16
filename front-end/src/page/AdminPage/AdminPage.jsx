import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPage.scss";
import { PcDisplayHorizontal, CaretDown, CaretLeft } from "react-bootstrap-icons";

function AdminPage() {
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  function toggleSidebar() {
    const sidebar = sidebarRef.current;
    const toggleButton = toggleButtonRef.current;
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    closeAllSubMenus();
  }

  function toggleSubMenu(button) {
    const sidebar = sidebarRef.current;
    if (!button.nextElementSibling.classList.contains('show')) {
      closeAllSubMenus();
    }
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');
    if (sidebar.classList.contains('close')) {
      sidebar.classList.toggle('close');
      toggleButtonRef.current.classList.toggle('rotate');
    }
  }

  function closeAllSubMenus() {
    const sidebar = sidebarRef.current;
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
      ul.classList.remove('show');
      ul.previousElementSibling.classList.remove('rotate');
    });
  }

  return (
    <div id="admin-page">
      <nav className="sidebar" ref={sidebarRef}>
        <ul>
          <li className="LogoContainer">
            <span className="logo"> AdminPanel</span>
            <button onClick={toggleSidebar} className="toggle-btn" ref={toggleButtonRef}>
              <CaretLeft style={{ height: 24 }} />
            </button>
          </li>
          <li>
            <button onClick={(e) => toggleSubMenu(e.currentTarget)} className="dropdown-btn">
              <PcDisplayHorizontal style={{ height: 24 }} />
              <span>Item</span>
              <CaretDown style={{ height: 24 }} />
            </button>
            <ul className="sub-menu">
              <div>
                <li> <Link to="/admin/categories">Categories</Link> {/* Full path: /admin/categories */}</li>
                <li> <Link to="/admin/capacities">Capacities</Link> {/* Full path: /admin/capacities */}</li>
                <li> <Link to="/admin/products">Products</Link> {/* Full path: /admin/products */}</li>
                <li> <Link to="/admin/mix-products">Mix Products</Link> {/* Updated from sell-products */}</li>
                <li> <Link to="/admin/prices">Custom Prices</Link> {/* Full path: /admin/prices */}</li>
              </div>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
