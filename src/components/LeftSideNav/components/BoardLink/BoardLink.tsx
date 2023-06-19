import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../../Dropdown/Dropdown';
import styles from './BoardLink.module.scss';

interface BoardLinkProps {
  title: string;
  board_id: string;
}

const BoardLink: React.FC<BoardLinkProps> = ({ title, board_id }) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const linkRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleDropDownToggle = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      if (!isDropDownVisible) {
        const menuItemPos = {
          top: linkRef.current?.offsetTop as number,
          left: linkRef.current?.offsetLeft as number,
        };
        const scrollTop = document.getElementById('#board__list__container')?.scrollTop as number;
        (linkRef.current?.querySelector('#board__list__wrapper') as HTMLDivElement).style.top = `${
          menuItemPos.top + 40 - scrollTop
        }px`;
        (linkRef.current?.querySelector('#board__list__wrapper') as HTMLDivElement).style.left = `${
          menuItemPos.left + 190
        }px`;
        setIsDropDownVisible(true);
      } else {
        setIsDropDownVisible(false);
      }
    },
    [isDropDownVisible]
  );

  useEffect(() => {
    if (isDropDownVisible) dropDownRef.current?.focus();
  }, [isDropDownVisible]);

  return (
    <div
      className={styles.board__list__link}
      onKeyDown={(e) => {
        if (e.code === 'Enter') navigate(`/board/${board_id}`);
      }}
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/board/${board_id}`)}
      ref={linkRef}
    >
      <ChevronRightIcon className={styles.arrow__right__icon} strokeWidth={3} />
      <p> {title}</p>
      <EllipsisHorizontalIcon
        data-testid="toggle-dropdown"
        className={styles.board__options__ellipses}
        tabIndex={0}
        onClick={handleDropDownToggle}
        id={`toggle__dropdown__${board_id}`}
      />
      <div
        className={styles.board__list__wrapper}
        id="board__list__wrapper"
        data-testid="board-dropdown-wrapper"
        style={{ display: isDropDownVisible ? 'block' : 'none' }}
        ref={dropDownRef}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onBlur={(e) => {
          if (e.relatedTarget?.id !== `toggle__dropdown__${board_id}`) {
            setIsDropDownVisible(false);
          }
        }}
      >
        <Dropdown
          options={[
            {
              title: 'Delete',
              onClick: (e) => {
                e.stopPropagation();
              },
            },
            {
              title: 'Duplicate',
              onClick: (e) => {
                e.stopPropagation();
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BoardLink;
