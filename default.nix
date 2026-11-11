{
  pkgs ? import sources.nixpkgs { },
  sources ? import ./npins,
}:
{
  shell = pkgs.mkShell {
    packages = [
      pkgs.nodejs_26
      pkgs.pnpm_12
      pkgs.docker-compose
      pkgs.prek
      pkgs.npins
    ];
  };
}
