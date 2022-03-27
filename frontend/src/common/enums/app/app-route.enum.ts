enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  EAM = '/eam',
  EAM_CREATE_WORKER = '/eam/create-worker',
  EAM_CONFIGURATE_GROUP = '/eam/configurate-group',
  EAM_CONFIGURATE_GROUP_$ID = '/eam/configurate-group/:id',
  BS = '/bs',
  BS_CREATE_SPACE = '/bs/create-space',
  SC = '/sc',
  SC_CONFIGURATE_INSTANCE = '/sc/configurate-instance',
  SC_CONFIGURATE_INSTANCE_$ID = '/sc/configurate-instance/:id',
  SLC = '/slc',
  SLC_CONFIGURATE_FUNCTION = '/slc/configurate-function',
  SLC_CONFIGURATE_FUNCTION_$ID = '/slc/configurate-function/:id',
  NOT_FOUND = '*',
  $ID = ':id',
}

export { AppRoute };
