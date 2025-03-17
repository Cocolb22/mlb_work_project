### 1. Installation de Chocolatey

1. Ouvrez PowerShell en tant qu'administrateur
2. Exécutez cette commande :
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
3. Vérifiez l'installation :
```powershell
choco --version
```
Vous devez voir apparaître une version.

### 2. Installation des outils : ruby, nodejs, yarn, sqlite

Une fois Chocolatey installé, vous pouvez tout installer les outils :

#### Ruby
```powershell
choco install ruby --version=3.3.5
```
Vérification :
```powershell
ruby --version
```

#### Node.js
```powershell
choco install nodejs --version=20.17.0
```
Vérification :
```powershell
node --version
```

#### Yarn
```powershell
choco install yarn --version=1.22.22
```
Vérification :
```powershell
yarn --version
```

#### SQLite
```powershell
choco install sqlite --version=3.43.2
```
Vérification :
```powershell
sqlite3 --version
```

### 3. Après l'installation

1. Fermez et rouvrez PowerShell pour que les changements prennent effet, ou exécutez :
```powershell
refreshenv
```

2. Vérifiez que tout est bien installé :
```powershell
choco list --local-only
```

### 4. Maintenance

Pour maintenir vos outils à jour :
```powershell
# Vérifier les mises à jour disponibles
choco outdated

# Mettre à jour tous les paquets
choco upgrade all -y
```

### Notes importantes

**Ruby** : Après l'installation, vous pouvez installer des gems :
```powershell
gem install bundler
```

### Résolution des problèmes courants

Si vous rencontrez des erreurs :

1. Vérifiez que PowerShell est bien en mode administrateur
2. Exécutez :
```powershell
choco doctor
```

3. Pour réinstaller un paquet :
```powershell
choco install -y nom_du_paquet --force
```

Tous ces outils seront automatiquement ajoutés au PATH Windows, donc ils seront disponibles dans n'importe quel terminal après l'installation.
