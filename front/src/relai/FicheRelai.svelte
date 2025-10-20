<svelte:options
  customElement={{
    tag: 'dsc-fiche-relai',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Fiche from '../Fiche.svelte';
  const zeroWidthSpace = '\u200b';
</script>

<dsfr-container>
  <Fiche
    menuId="menu-fiche-relai"
    menu={[
      {
        id: 'menu-qui',
        label: 'Qui peut devenir un relai ?',
        href: '#qui',
        isCollapsible: false,
        type: 'link',
      },
      {
        id: 'menu-conditions',
        label: `Conditions d’utilisation de la marque Demain${zeroWidthSpace}Spécialiste${zeroWidthSpace}Cyber`,
        href: '#conditions',
        isCollapsible: false,
        type: 'link',
      },
    ]}
  >
    <section>
      Devenez relai de Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber en
      associant la marque
      "Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber" à vos actions en
      faveur de la formation des jeunes à la cybersécurité et la découverte de
      ses métiers.
    </section>

    <section id="qui">
      <h2>Qui peut devenir un relai&nbsp;?</h2>
      <p>
        Vous représentez un établissement d'enseignement primaire, secondaire,
        supérieure ou de formation continue œuvrant en faveur de la formation
        des jeunes et des adultes à la cybersécurité. <br /> <br />
        Vous êtes une entité publique ou une association loi 1901 à but non lucratif
        et planifiez une initiative en faveur de la sensibilisation des jeunes aux
        bonnes pratiques, de la découverte de la cybersécurité et de ses enjeux,
        de ses métiers et des parcours d'orientation.
      </p>
    </section>

    <section id="conditions">
      <h2>
        Conditions d'utilisation de la marque
        Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber
      </h2>
      <p>
        En tant que relai, vous pouvez utiliser le bloc marque
        Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber sur toutes vos
        productions.
        <br /> <br />
        Vous pouvez communiquer sur vos actions en tant que "relai".
        <br /> <br />
        Propositions de formulations&nbsp;
        <br />
      </p>
      <ul>
        <li>Relai Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber</li>
        <li>
          L'université x est relai de
          Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber
        </li>
        <li>
          L'université x soutient
          Demain&ZeroWidthSpace;Spécialiste&ZeroWidthSpace;Cyber&nbsp;: la
          plateforme pour découvrir la cybersécurité et ses métiers.
        </li>
      </ul>
    </section>
  </Fiche>
</dsfr-container>

<style lang="scss">
  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
  }
</style>
