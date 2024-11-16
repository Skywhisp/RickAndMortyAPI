import { useEffect } from 'react';
import styled from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  // Закрытие Popup
  function togglePopup(e) {
    if (e.target === e.currentTarget) {
      setSettings((prevState) => ({
        ...prevState,
        visible: !prevState.visible
      }));
    }
  }

  // Закрытие по Esc
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
      }
    }

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Блокировка прокрутки страницы
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Убираем блокировку прокрутки
    };
  }, [visible, setSettings]);

  return (
    <PopupContainer visible={visible} onClick={togglePopup}>
      <StyledPopup>
        <CloseIcon
          onClick={() =>
            setSettings((prevState) => ({ ...prevState, visible: false }))
          }
        />
        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />
        <PopupInfo origin={origin} location={location} />
        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto; /* Включаем прокрутку */
  color: #fff;

  /* Скрытие стандартного скроллбара */
  &::-webkit-scrollbar {
    width: 0; /* Убираем ширину для Chrome/Safari */
    height: 0;
  }

  scrollbar-width: none; /* Убираем для Firefox */

  @media (max-width: 930px) {
    width: 80%;
    padding: 20px;
  }

  @media (max-width: 600px) {
    width: 90%;
    padding: 15px;
    margin-top: 20px;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute; /* Крестик внутри Popup */
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;
  z-index: 11;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }

  @media (max-width: 600px) {
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
  }
`;
