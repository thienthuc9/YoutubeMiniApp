import React from "react";
import "./Header.css"; 

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Logo YouTube */}
      <div className="header__logo">
        <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="YouTube Logo" />
      </div>

      {/* Thanh tìm kiếm */}
      <div className="header__search">
        <input type="text" placeholder="Tìm kiếm" />
        <button>
          <span className="material-icons">search</span>
        </button>
      </div>

      {/* Các icon bên phải */}
      <div className="header__icons">
        <button>
          <span className="material-icons">video_call</span> {/* Nút tải video */}
        </button>
        <button>
          <span className="material-icons">notifications</span> {/* Icon thông báo */}
        </button>
        <img className="header__avatar" src="https://via.placeholder.com/40" alt="User Avatar" />
      </div>
    </header>
  );
};

export default Header;