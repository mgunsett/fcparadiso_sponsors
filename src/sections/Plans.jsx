import { Box, Button, Container, Grid, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { useContent } from '../i18n'
import { scrollToId } from '../hooks/useScrollTo'

function PlanCard({ plan }) {
  const { plans: t } = useContent()
  const hi = plan.highlight
  return (
    <Box
      bg={hi ? 'brand.deep' : 'white'}
      color={hi ? 'brand.chalk' : 'brand.ink'}
      border="1px solid"
      borderColor={hi ? 'brand.deep' : 'rgba(15,61,34,0.18)'}
      borderTop="4px solid"
      borderTopColor={hi ? 'brand.gold' : 'brand.grass'}
      p={{ base: 6, md: 8 }}
      display="flex"
      flexDirection="column"
      transform={{ lg: hi ? 'translateY(-1.25rem)' : 'none' }}
    >
      <Text fontFamily="heading" fontSize="sm" letterSpacing="0.06em" color={hi ? 'brand.gold' : 'brand.grass'}>
        {plan.tagline}
      </Text>
      <Heading as="h3" fontFamily="'Russo One', sans-serif" fontWeight='normal' lineHeight={0.9} fontSize="2.75rem" mt={1}>
        {plan.name}
      </Heading>
      <List mt={6} spacing={3} flex={1}>
        {plan.benefits.map((b) => (
          <ListItem key={b} display="flex" gap={3} alignItems="flex-start" fontSize="md">
            <Box as="span" mt="0.55em" w="8px" h="8px" flexShrink={0} borderRadius="50%" bg={hi ? 'brand.gold' : 'brand.grass'} />
            {b}
          </ListItem>
        ))}
      </List>
      <Button mt={8} variant={hi ? 'gold' : 'outlineDeep'} size="lg" onClick={() => scrollToId('contacto', { plan: plan.name })}>
        {t.cta}
      </Button>
    </Box>
  )
}

export default function Plans() {
  const { plans: t } = useContent()

  return (
    <Box as="section" id="planes" bg="brand.chalk" py={{ base: 16, md: 24 }} borderTop="1px solid rgba(15,61,34,0.12)">
      <Container maxW="80rem">
        <Box maxW="36rem">
          <Heading as="h2" fontFamily="'Russo One', sans-serif" fontWeight='normal' lineHeight={0.9} fontSize={{ base: '2.5rem', md: '3.75rem' }} color="brand.deep">
            {t.title}
          </Heading>
          <Text mt={4} fontSize="lg" color="gray.700">
            {t.intro}
          </Text>
        </Box>
        <Grid mt={{ base: 10, lg: 16 }} templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={{ base: 5, lg: 6 }} alignItems="stretch">
          {t.items.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
