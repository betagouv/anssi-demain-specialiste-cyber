{
  pkgs ? import sources.nixpkgs { },
  sources ? import ./npins,
}:
let
  # Utilise .nvmrc comme source de vérité pour la version majeure de Node.js.
  nodeVersion = pkgs.lib.strings.trim (builtins.readFile ./.nvmrc);
  nodejs =
    pkgs."nodejs_${nodeVersion}" or (throw "Unsupported Node.js version in .nvmrc: ${nodeVersion}");
  nodejs-slim =
    pkgs."nodejs-slim_${nodeVersion}"
      or (throw "Unsupported Node.js version in .nvmrc: ${nodeVersion}");
  pnpm = pkgs.pnpm_12.override { inherit nodejs-slim; };
in
{
  shell = pkgs.mkShell {
    packages = [
      nodejs
      pnpm
      pkgs.docker-compose
      pkgs.prek
      pkgs.npins
    ];

    shellHook = ''
      export PATH="${pnpm}/bin:$PATH"
    '';
  };
}
