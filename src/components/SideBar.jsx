import { Link } from "react-router-dom";
import { useState } from "react";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const sidebarConfig = [
    {
      title: "See Analytics",
      iconClass: "fas fa-chart-bar",
      link: "/",
    },
    {
      title: "Manage Bills",
      iconClass: "fas fa-file-invoice-dollar",
      items: [
        { name: "Add Bills", link: "/bills/add" },
        { name: "Get Bills", link: "/bills/get" },
      ],
    },
    {
      title: "Manage Employee",
      iconClass: "fas fa-users",
      items: [
        { name: "Add Employee", link: "/employees/add" },
        { name: "Get Employees", link: "/employees/get" },
      ],
    },
    {
      title: "Manage Categories",
      iconClass: "fas fa-th-list",
      items: [
        { name: "Add Food Categories", link: "/food-categories/add" },
        { name: "Get Food Categories", link: "/food-categories/get" },
      ],
    },
    {
      title: "Manage Food",
      iconClass: "fas fa-utensils",
      items: [
        { name: "Add Food List", link: "/food-list/add" },
        { name: "Get Food List", link: "/food-list/get" },
      ],
    },
    {
      title: "Add ingrediants",
      iconClass: "fas fa-heart",
      link: "/ingrediants",
    },
     {
      title: "Orders List",
      iconClass: "fas fa-receipt",
      link: "/orders",
    },
    {
      title: "Settings",
      iconClass: "fas fa-cog",
      items: [
        { name: "General", link: "/Setting" },
        { name: "System Key", link: "/sysKey" },
        { name: "Profile", link: "/Profile" },
      ],
    },
    {
      title: "Feed back",
      iconClass: "fas fa-comment",
      link: "/feedback",
    },
 
  ];

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <aside
      id="sidebar"
      className="js-custom-scroll side-nav mCustomScrollbar _mCS_1 mCS-autoHide mCS_scrollbar !overflow-y-scroll"
    >
      <ul id="sideNav" className="side-nav-menu side-nav-menu-top-level mb-0">
        {sidebarConfig.map((section, index) => (
          <li key={index} className="side-nav-menu-item">
            {section.items ? (
              <div className="accordion-section">
                <header
                  onClick={() => handleAccordionClick(index)}
                  className="accordion-header cursor-pointer d-flex align-items-center hover:bg-gray-200 hover:text-gray-900"
                  aria-expanded={activeIndex === index}
                  aria-controls={`accordion-${index}`}
                >
                  <span className="side-nav-menu-icon d-flex mr-3">
                    <i className={section.iconClass}></i>
                  </span>
                  <span className="side-nav-fadeout-on-closed media-body">
                    {section.title}
                  </span>
                  <span className="side-nav-control-icon d-flex ml-auto">
                    {activeIndex === index ? (
                      <i className="gd-angle-up icon-text text-xs"></i>
                    ) : (
                      <i className="gd-angle-down icon-text text-xs"></i>
                    )}
                  </span>
                </header>

                <div
                  id={`accordion-${index}`}
                  className={`accordion-collapse ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <ul className="side-nav-menu side-nav-menu-second-level mb-0 ">
                    {section.items.map((item, idx) => (
                      <li className="side-nav-menu-item py-1 hover:bg-gray-200 hover:text-gray-900" key={idx}>
                        <Link className="side-nav-menu-link" to={item.link}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                className="side-nav-menu-link media align-items-center hover:bg-gray-200 hover:text-gray-900"
                to={section.link}
              >
                <span className="side-nav-menu-icon d-flex mr-3">
                  <i className={section.iconClass}></i>
                </span>
                <span className="side-nav-fadeout-on-closed media-body">
                  {section.title}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
