import { PrismaClient } from '@prisma/client';
import { DecoratorHelper } from '../helper/decorator';

DecoratorHelper.setMetadata('engine:module', 'provider', PrismaClient);
DecoratorHelper.setMetadata('provider:name', PrismaClient.name, PrismaClient);

export default PrismaClient;
