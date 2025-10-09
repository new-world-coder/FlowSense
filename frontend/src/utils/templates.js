// Template Manager for Cadence Smart Contracts

import NFTTemplate from '../templates/NFT.cdc?raw';
import TokenTemplate from '../templates/Token.cdc?raw';
import MarketplaceTemplate from '../templates/Marketplace.cdc?raw';
import VaultTemplate from '../templates/Vault.cdc?raw';
import AccessControlTemplate from '../templates/AccessControl.cdc?raw';
import BasicNFTTemplate from '../templates/BasicNFT.cdc?raw';
import DAOTemplate from '../templates/DAO.cdc?raw';

export const contractTemplates = [
  {
    id: 'nft',
    name: 'NFT Collection',
    description: 'Complete NFT collection with minting and metadata',
    category: 'NFT',
    icon: '🖼️',
    template: NFTTemplate,
    variables: [
      { key: 'NAME', label: 'Contract Name', default: 'MyNFTCollection', type: 'text' },
    ],
  },
  {
    id: 'basic-nft',
    name: 'Basic NFT',
    description: 'Simple NFT contract with basic functionality',
    category: 'NFT',
    icon: '🎨',
    template: BasicNFTTemplate,
    variables: [
      { key: 'NAME', label: 'Contract Name', default: 'BasicNFT', type: 'text' },
    ],
  },
  {
    id: 'token',
    name: 'Fungible Token',
    description: 'Create your own fungible token with minting and burning',
    category: 'Token',
    icon: '🪙',
    template: TokenTemplate,
    variables: [
      { key: 'NAME', label: 'Token Name', default: 'MyToken', type: 'text' },
    ],
  },
  {
    id: 'marketplace',
    name: 'NFT Marketplace',
    description: 'Peer-to-peer marketplace for buying and selling NFTs',
    category: 'DeFi',
    icon: '🛒',
    template: MarketplaceTemplate,
    variables: [
      { key: 'NAME', label: 'Marketplace Name', default: 'MyMarketplace', type: 'text' },
      { key: 'FEE_PERCENTAGE', label: 'Fee Percentage', default: '2.5', type: 'number' },
    ],
  },
  {
    id: 'vault',
    name: 'Secure Vault',
    description: 'Secure storage vault with access control',
    category: 'Storage',
    icon: '🔒',
    template: VaultTemplate,
    variables: [
      { key: 'NAME', label: 'Vault Name', default: 'SecureVault', type: 'text' },
    ],
  },
  {
    id: 'access-control',
    name: 'Access Control',
    description: 'Role-based access control system',
    category: 'Security',
    icon: '🛡️',
    template: AccessControlTemplate,
    variables: [
      { key: 'NAME', label: 'Contract Name', default: 'AccessControl', type: 'text' },
    ],
  },
  {
    id: 'dao',
    name: 'DAO Governance',
    description: 'Decentralized governance with proposals and voting',
    category: 'DAO',
    icon: '🗳️',
    template: DAOTemplate,
    variables: [
      { key: 'NAME', label: 'DAO Name', default: 'MyDAO', type: 'text' },
    ],
  },
];

/**
 * Get template by ID
 * @param {string} templateId - Template ID
 * @returns {Object|null} Template object
 */
export const getTemplate = (templateId) => {
  return contractTemplates.find(t => t.id === templateId) || null;
};

/**
 * Replace variables in template
 * @param {string} template - Template string
 * @param {Object} variables - Object with key-value pairs
 * @returns {string} Processed template
 */
export const processTemplate = (template, variables = {}) => {
  let processed = template;
  
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processed = processed.replace(regex, variables[key]);
  });
  
  return processed;
};

/**
 * Generate contract from template
 * @param {string} templateId - Template ID
 * @param {Object} variables - Variables to replace
 * @returns {string} Generated contract code
 */
export const generateFromTemplate = (templateId, variables = {}) => {
  const template = getTemplate(templateId);
  
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }
  
  // Merge default values with provided variables
  const mergedVariables = {};
  template.variables.forEach(v => {
    mergedVariables[v.key] = variables[v.key] || v.default;
  });
  
  return processTemplate(template.template, mergedVariables);
};

/**
 * Get all template categories
 * @returns {Array<string>} Array of unique categories
 */
export const getCategories = () => {
  const categories = contractTemplates.map(t => t.category);
  return [...new Set(categories)];
};

/**
 * Get templates by category
 * @param {string} category - Category name
 * @returns {Array<Object>} Array of templates
 */
export const getTemplatesByCategory = (category) => {
  return contractTemplates.filter(t => t.category === category);
};

export default {
  contractTemplates,
  getTemplate,
  processTemplate,
  generateFromTemplate,
  getCategories,
  getTemplatesByCategory,
};

