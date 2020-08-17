const stringsEn = {
  setup: {
    launch: {
      messages: {
        requiresConfig:
          'This extension requires configuration. Please contact the creator/maintainer of this dashboard and ask that they complete the setup process.',
        completeSetup:
          'Please complete the setup process in order to start generating predictions from Einstein.',
      },
      components: {
        buttons: {
          openSetup: 'Open Setup',
        },
      },
    },
  },
};

export default stringsEn;

export type StringsEn = typeof stringsEn;
