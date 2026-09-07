import { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { nav } from '../data/content'
import { scrollToId } from '../hooks/useScrollTo'

// Navbar flotante, centrada, pegada al bottom. Marca la sección activa por IntersectionObserver.
export default function Navbar() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setCurrent(visible.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.2, 0.5] },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <Box as="nav" aria-label="Secciones" position="sticky" bottom={0} zIndex={50} pointerEvents="none" h={0}>
      <Flex
        pointerEvents="auto"
        mx="auto"
        w="fit-content"
        transform="translateY(calc(-100% - 1rem))"
        bg="rgba(8,33,26,0.82)"
        backdropFilter="blur(12px)"
        border="1px solid rgba(244,246,241,0.14)"
        borderRadius="999px"
        p={1}
        gap={0.5}
      >
        {nav.map((n) => {
          const active = current === n.id
          return (
            <Box
              key={n.id}
              as="button"
              type="button"
              onClick={() => scrollToId(n.id)}
              px={{ base: 3, md: 4 }}
              py={2}
              borderRadius="999px"
              fontFamily="heading"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight={600}
              letterSpacing="0.04em"
              color={active ? 'brand.ink' : 'brand.chalk'}
              bg={active ? 'brand.gold' : 'transparent'}
              transition="background 200ms ease, color 200ms ease"
              _hover={{ bg: active ? 'brand.gold' : 'rgba(244,246,241,0.1)' }}
              _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
              aria-current={active ? 'true' : undefined}
            >
              {n.label}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
