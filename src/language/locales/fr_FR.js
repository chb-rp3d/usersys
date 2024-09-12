export default {
  global: {
    btn__conform: 'OK',
    btn__cancel: 'Annuler',
    loading: 'Chargement...',
    placeholder: 'Veuillez entrer {0}',
  },
  pages: {
    menu__userinfo: 'Informations personnelles',
    menu__account: 'Compte & Sécurité',
  },
  login: {
    // 注册流程公用
    label__region: 'Région',
    label__email: 'Email',
    label__password: 'Mot de passe',
    label__email_code: 'Code de vérification',
    label__img_code: 'Captcha',
    btn__login: 'Se connecter',
    btn__register: 'S\'inscrire',
    btn__register_now: 'S\'inscrire maintenant',
    btn__email_code: 'Envoyer le code de vérification',
    placeholder__pwd: 'Veuillez saisir votre mot de passe de connexion',
    placeholder__pwd_new: 'Veuillez saisir un nouveau mot de passe',
    tip__email_code_miss: 'Vous n\'avez pas reçu le code de vérification ?',
    tip__empty: '{0} ne peut pas être vide',
    tip__password: 'Votre mot de passe doit être composé de 8 à 16 caractères et inclure au moins 2 des éléments suivants : lettres majuscules, lettres minuscules ou chiffres.',
    toast__code_send: 'Le code de vérification a été envoyé.',
    tips__cookie: 'Nous utilisons des cookies pour garantir une navigation rapide. En continuant à naviguer sur ce site, vous acceptez l\'utilisation des cookies.',
    btn__cookie_more: 'Détails',
    // 表单校验
    valid__email_format: 'Format d\'e-mail incorrect',
    valid__ticket_require: 'Veuillez saisir le code de vérification de l\'e-mail',
    valid__ticket_length_6: 'Le code de vérification doit être composé de 6 chiffres',
    // 登录表单
    title__login: 'Connexion au compte',
    allow_policy: 'J\'ai lu et accepté {0} et {1}',
    user_agreement: 'Contrat d\'utilisation de Revopoint',
    privacy_policy: 'Politique de confidentialité de Revopoint',
    plz_allow_policy: 'Veuillez lire et accepter la politique de confidentialité',
    msg__success: 'Connexion réussie',
    failed: 'Erreur de mot de passe',
    keep_pwd: 'Mémoriser mon mot de passe',
    forget_pwd: 'Vous avez oublié votre mot de passe ?',
    // 注册表单
    title__register: 'S\'inscrire',
    has_account: 'Vous avez déjà un compte ?',
    tip__region: 'Veuillez choisir votre région avec soin car elle ne peut pas être modifiée après la soumission.',
    toast__register_success: 'Inscription réussie.',
    placeholder__region: 'Sélectionner une région',
    // 忘记密码表单
    title__forget_password: 'Mot de passe oublié',
    toast__reset_password_success: 'Réinitialisation du mot de passe réussie.',
    placeholder_email: 'Il peut être utilisé pour se connecter ou réinitialiser son mot de passe.',
    placeholder_new_pwd: 'Réinitialiser votre mot de passe',
    back_to_login: 'Retour à la connexion',
    no_result: 'Aucune donnée correspondante.',
    no_data_retry: 'Pas de données. Veuillez actualiser et réessayer.',
  },
  account: {
    logout: 'Déconnexion',
    user_id: 'Identifiant de l\'utilisateur',
    valid__password_not_same: 'Les mots de passe ne correspondent pas',
    valid__password_same: 'Le nouveau mot de passe est identique à l\'ancien.',
    old_password: 'Ancien mot de passe',
    new_password: 'Nouveau mot de passe',
    placeholder__password_again: 'Saisir à nouveau le nouveau mot de passe',
    placeholder__delete_account: 'Saisissez votre mot de passe',
    change_password: 'Modifier le mot de passe',
    delete_account: 'Déconnexion',
    logout_success: 'Déconnexion réussie',
    update_password_success: 'Mot de passe mis à jour avec succès.',
    logout_is_sure: 'Confirmer la déconnexion ?',
  },
  error: {
    too_many_count: 'Trop de demandes. Veuillez réessayer plus tard',
    unknown_error: 'La requête a échoué. Veuillez réessayer plus tard',
    too_many_requests: 'Service occupé, Réessayez plus tard',
    captcha_error: 'Erreur du code de vérification Captcha',
    email_verify_code_error: 'Erreur de code de vérification E-mail',
    email_already_exist: 'L’e-mail existe déjà',
    email_no_exist: 'E-mail non enregistré',
    old_password_error: 'Ancien mot de passe incorrect',
    password_error: 'Nom d’utilisateur ou mot de passe Incorrect',
    account_forbidden: 'Ce compte a été désactivé',
    account_unregister: 'Ce compte a été annulé',
    temp_token_expire: 'L\'opération a été interrompue. Veuillez réessayer',
    password_error_too_many: 'Trop de tentatives de mot de passe',
  }
}
