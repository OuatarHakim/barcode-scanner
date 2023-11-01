# Client

## Configuration de l'application

Il est nécessaire de connaître l'adresse IP de votre machine sur le réseau car l'émulateur a son propre réseau donc pas le même localhost. Vous pouvez la connaître via cette commande : 

```shell
ip a # ou ipconfig ou ifconfig
```

Installation des dépendences :

```shell
npm i
```

Lancement de l'application :

```shell
API_URL= http://194.254.109.166:8000 STRIPE_PK= pk_test_51O2uuzKCv5BFmtdH53BzQ5dDnFSyo3XN0GRIfltEQRswaI7h73Et59ITF2Kpb9C0B0Uy1sqqYOjcH1RKCAhlRMdT00aq7rmBsN npm run android
```

La clé publique `STRIPE_PK` est disponible depuis le dashboard de Stripe.