'use client'

import { $catalogMenuIsOpen, closeCatalogMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Header from './Header'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogMenuButton from './CatalogMenuButton'
import CatalogMenuList from './CatalogMenuList'
import Accordion from '../Accordion/Accordion'
import Link from 'next/link'

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
  const [showClothList, setShowClothList] = useState(false)
  const [showAccessoriesList, setShowAccessoriesList] = useState(false)
  const [showSouvenirsList, setShowSouvenirsList] = useState(false)
  const [showOfficeList, setShowOfficeList] = useState(false)
  const { lang, translations } = useLang()
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    2,
    catalogMenuIsOpen,
  )
  const isMedia450 = useMediaQuery(450)
  const handleClothList = () => {
    setShowAccessoriesList(false)
    setShowClothList(true)
    setShowOfficeList(false)
    setShowSouvenirsList(false)
  }

  const handleAccessoriesList = () => {
    setShowAccessoriesList(true)
    setShowClothList(false)
    setShowOfficeList(false)
    setShowSouvenirsList(false)
  }

  const handleOfficeList = () => {
    setShowAccessoriesList(false)
    setShowClothList(false)
    setShowOfficeList(true)
    setShowSouvenirsList(false)
  }
  const handleSouvenirsList = () => {
    setShowAccessoriesList(false)
    setShowClothList(false)
    setShowOfficeList(false)
    setShowSouvenirsList(true)
  }
  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeCatalogMenu()
    setShowClothList(false)
    setShowOfficeList(false)
    setShowAccessoriesList(false)
    setShowSouvenirsList(false)
  }
  const items = [
    {
      name: translations[lang].main_menu.cloth,
      id: 1,
      items: [
        translations[lang].comparison['t-shirts'],
        translations[lang].comparison['long-sleeves'],
        translations[lang].comparison.hoodie,
        translations[lang].comparison.outerwear,
      ],
      handler: handleClothList,
    },
    {
      name: translations[lang].main_menu.accessories,
      id: 2,
      items: [
        translations[lang].comparison.bags,
        translations[lang].comparison.headdress,
        translations[lang].comparison.umbrella,
      ],
      handler: handleAccessoriesList,
    },
    {
      name: translations[lang].main_menu.souvenirs,
      id: 3,
      items: [
        translations[lang].comparison['business-souvenirs'],
        translations[lang].comparison['promotional-souvenirs'],
      ],
      handler: handleSouvenirsList,
    },
    {
      name: translations[lang].main_menu.office,
      id: 4,
      items: [
        translations[lang].comparison.notebook,
        translations[lang].comparison.pen,
      ],
      handler: handleOfficeList,
    },
  ]

  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <img
                className='catalog-menu__bg'
                src='/img/menu-bg-small.png'
                alt='menu-background'
              />
              <motion.button
                onClick={handleCloseMenu}
                variants={itemVariants}
                className='btn-reset catalog-menu__close'
              />
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    handler: handler as VoidFunction,
                    name,
                    isActive,
                  })
                  const isCurrentList = (
                    showList: boolean,
                    currentId: number,
                  ) => showList && id === currentId
                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='catalog-menu__list__item'
                    >
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton
                              {...buttonProps(showClothList)}
                            />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton
                              {...buttonProps(showAccessoriesList)}
                            />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(showSouvenirsList)}
                            />
                          )}
                          {id === 4 && (
                            <CatalogMenuButton
                              {...buttonProps(showOfficeList)}
                            />
                          )}
                        </>
                      )}
                      {!isMedia450 && (
                        <AnimatePresence>
                          {isCurrentList(showClothList, 1) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showAccessoriesList, 2) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showSouvenirsList, 3) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(showOfficeList, 4) && (
                            <CatalogMenuList items={items} />
                          )}
                        </AnimatePresence>
                      )}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((title, idx) => (
                              <li
                                key={idx}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  className='nav-menu__accordion__item__list__item__link'
                                  href={'/catalog'}
                                >
                                  {title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu
