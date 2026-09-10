import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Heading, Text, VisuallyHidden } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StadiumScene from '../scenes/StadiumScene'
import { useContent } from '../i18n'
import { scrollToId } from '../hooks/useScrollTo'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

export default function StadiumImmersion() {
  const { boardSectors, stadiumSection: t } = useContent()
  const sectionRef = useRef(null)
  const progress = useRef(0)
  const [active, setActive] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [logoUrl, setLogoUrl] = useState(null)
  const fileInput = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        progress.current = self.progress
        const isGround = self.progress > 0.62
        setActive((prev) => (prev === isGround ? prev : isGround))
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    if (!active) setSelectedId(null)
  }, [active])

  const onSelect = useCallback((id) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (logoUrl) URL.revokeObjectURL(logoUrl)
    setLogoUrl(URL.createObjectURL(file))
  }

  const clearLogo = () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl)
    setLogoUrl(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  const selected = boardSectors.find((s) => s.id === selectedId)

  return (
    <Box as="section" id="estadio" ref={sectionRef} position="relative" h="320vh" bg="brand.night">
      <Box position="sticky" top={0} h="100vh" overflow="hidden">
        {/* Los sectores viajan por props: el <Canvas> de r3f es otro renderer y no
            recibe el contexto de idioma del árbol de arriba. */}
        <StadiumScene
          sectors={boardSectors}
          progress={progress}
          selectedId={selectedId}
          onSelect={onSelect}
          logoUrl={logoUrl}
          active={active}
        />

        {/* Viñeta para que el texto respire sobre la foto */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          bgGradient="linear(to-b, rgba(8,33,26,0.55) 0%, rgba(8,33,26,0) 30%, rgba(8,33,26,0) 70%, rgba(8,33,26,0.7) 100%)"
        />

        {/* Título y pista de scroll: visibles en la vista aérea.
            Van a la derecha, sobre la franja que deja libre el paneo de la foto aérea
            hacia la tribuna (AERIAL_TARGET.x en StadiumScene). Como esa franja se cierra
            a medida que entra el zoom, el texto lleva sombra para seguir legible sobre el césped. */}
        <AnimatePresence>
          {!active && (
            <MotionBox
              key="intro"
              position="absolute"
              right={{ base: 5, md: 10 }}
              top={{ base: 24, md: 28 }}
              maxW={{ base: '20rem', md: '22rem' }}
              textAlign="right"
              color="brand.chalk"
              textShadow="0 2px 20px rgba(8,33,26,0.75)"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <Heading as="h2" fontFamily="'Russo One', sans-serif" fontWeight='normal' lineHeight={0.9} fontSize={{ base: '2.5rem', md: '3.75rem' }}>
                {t.title}
              </Heading>
              <Text mt={4} fontSize={{ base: 'sm', md: 'md' }} color="brand.mist">
                {t.intro}
              </Text>
              <Text mt={8} fontFamily="heading" fontSize="sm" letterSpacing="0.08em" color="brand.gold">
                {t.scrollHint} ↓
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Panel de detalle del sector */}
        <AnimatePresence>
          {active && (
            <MotionBox
              key="panel"
              position="absolute"
              right={{ base: 0, md: 8 }}
              bottom={{ base: 0, md: 8 }}
              left={{ base: 0, md: 'auto' }}
              w={{ base: '100%', md: '22rem' }}
              bg="rgba(8,33,26,0.86)"
              backdropFilter="blur(10px)"
              color="brand.chalk"
              borderTop={{ base: '2px solid', md: 'none' }}
              borderLeft={{ base: 'none', md: '2px solid' }}
              borderColor="brand.gold"
              p={{ base: 5, md: 6 }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35 }}
            >
              {selected ? (
                <>
                  <Text fontFamily="heading" fontSize="sm" color="brand.gold" letterSpacing="0.06em">
                    {selected.id}
                  </Text>
                  <Heading as="h3" fontSize="2rem" mt={1}>
                    {selected.name}
                  </Heading>
                  <Flex mt={3} gap={6} fontSize="sm" color="brand.mist">
                    <Box>
                      <Text>{t.sizeLabel}</Text>
                      <Text color="brand.chalk" fontWeight={600}>{selected.size}</Text>
                    </Box>
                    <Box>
                      <Text>{t.viewLabel}</Text>
                      <Text color="brand.chalk" fontWeight={600}>{selected.view}</Text>
                    </Box>
                  </Flex>

                  <Flex mt={5} gap={2} wrap="wrap">
                    <Button size="sm" variant="outlineChalk" onClick={() => fileInput.current?.click()}>
                      {t.uploadLabel}
                    </Button>
                    {logoUrl && (
                      <Button size="sm" variant="ghost" color="brand.mist" onClick={clearLogo}>
                        {t.clearCta}
                      </Button>
                    )}
                    <VisuallyHidden>
                      <input
                        ref={fileInput}
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg,image/webp"
                        onChange={onFile}
                      />
                    </VisuallyHidden>
                  </Flex>
                  <Text mt={2} fontSize="xs" color="brand.mist">{t.uploadHint}</Text>

                  <Button
                    mt={5}
                    w="100%"
                    variant="gold"
                    size="lg"
                    onClick={() => scrollToId('contacto', { sector: selected.id })}
                  >
                    {t.quoteCta}
                  </Button>
                </>
              ) : (
                <Text color="brand.mist">{t.emptyState}</Text>
              )}
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  )
}
