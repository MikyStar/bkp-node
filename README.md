# BKP (Node)

Create and extract backups of a file or directory compressed with `tgz` and encrypted
with `aes-256-cbc` with both your `password and a generated initialization vector`

## Installation

Requires [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```sh
npm i -g bkp-node # Install package

bkp --version # Print installed version
bkp --help # Print the manuel
```

---

# Use

## Create backup

```sh
# Prototype
bkp <c|create> <source path> [<destination path>]

# Examples
bkp c myFile # Create a backup named 'myFile.bkp'
bkp c myFile here # Create a backup named 'here'
```

_source path_ : Absolute or relative path of what you want to backup

_destination path_ : Optional, absolute or relative path to where you want your backup file, default: **'.bkp'**

>It will then prompt you for the password you want to set

>After encryption, a initialization vector will be outputed, `you must store it in order to decrypt afterwards`

---

## Extract backup

```sh
# Prototype
bkp <x|extract> <source path> [<destination path>]

# Examples
bkp x myFile.bkp # Extract the backup inside 'myFile'
bkp x myFile.bkp here # Extract the backup inside 'here'
bkp x myFile # Extract the backup inside 'myFile.dec'
```

_source path_ : Absolute or relative path of your backup location

_destination path_ : Optional, absolute or relative path to where you want your clear content, if you have used the default **'.bkp'** extension it will be trimmed, otherwise it will append the prefix **'.dec'**

>It will then prompt you for the password you have set

>Then, you provide **the initialization vector** that was generated during the backup creation

---

## Syncronize backup with RSync

```sh
# Prototype
bkp <s|sync> <source path> <destination path> [--dry-run]

# Examples
bkp s source.bkp existing-destination.bkp # Sync a backup
```

_source path_ : Absolute or relative path to what you want to backup

_destination path_ : Absolute or relative path of the backup you want to sync

_--dry-run_ : Using this flag will not actually run the syncronization but will let you know what changes would be done if you do sync

>It will then prompt you for the password you have set to create the backup

>Then, you provide **the initialization vector** that was generated during the backup creation

---

# Tasks

Using [CLI-Manager](https://github.com/MikyStar/CLI-Manager) to handle tasks
