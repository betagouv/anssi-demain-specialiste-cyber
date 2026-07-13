<script lang="ts">
</script>

<div class="communaute">
  <dsfr-container>
    <div class="encart">
      <img
        class="icone"
        src="/assets/images/passe-ton-hack-d-abord/tchat.svg"
        alt=""
      />
      <p class="texte-standard-md">
        <strong>
          Rejoignez la communauté enseignante “Passe ton Hack d’Abord” sur
          Magistère.
        </strong>
        <a
          class="lien"
          href="https://magistere.apps.education.fr/?wantsurl=aHR0cHM6Ly9wYXJ0YWdlMDIubWFnaXN0ZXJlLmFwcHMuZWR1Y2F0aW9uLmZyL2NvdXJzZS92aWV3LnBocD9pZD0zMDA%3D"
          >Rejoindre la communauté</a
        >
      </p>
    </div>
    <hr class="separateur" />
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .communaute {
    padding-top: 4.5rem;
  }

  .encart {
    align-items: flex-start;
    display: flex;
    gap: 0.5rem;

    .icone {
      flex-shrink: 0;
      height: 1.5rem;
      width: 1.5rem;
    }

    p {
      margin: 0;
    }
  }

  .lien {
    color: var(--text-action-high-blue-france, #000091);
    text-decoration: underline;
  }

  .separateur {
    margin-top: 3.5rem;
  }
</style>
