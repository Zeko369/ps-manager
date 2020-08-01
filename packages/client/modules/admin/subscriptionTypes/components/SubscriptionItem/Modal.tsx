import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  Box,
  Heading,
  Input,
  List,
  ListItem,
  IconButton,
  FormLabel,
  Stack,
  Flex
} from '@chakra-ui/core';
import { useProductsQuery, useCreateSubscriptionItemMutation } from '../../../../../generated';
import { SubscriptionItemContext } from './Context';

export interface ISubscriptionItemModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onMainClick: () => any;
  create?: boolean;
}

const SubscriptionItemModal: React.FC<ISubscriptionItemModalProps> = (props) => {
  const { onClose, isOpen, title, onMainClick, create } = props;

  const [showProducts, setShowProducts] = useState<boolean>(false);
  const { loading, error, data } = useProductsQuery();

  const { nameInput, searchInput, added, amounts, add, remove, setAmounts } = useContext(
    SubscriptionItemContext
  );

  const toggleProducts = () => setShowProducts((x) => !x);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input name="name" placeholder="Name" {...nameInput} />
              </Box>

              {loading || !data ? (
                <Spinner />
              ) : error ? (
                <Box>
                  <Heading>Error....</Heading>
                  <code>{error.message}</code>
                </Box>
              ) : (
                <Box>
                  {showProducts && (
                    <Box>
                      <FormLabel htmlFor="search">Search</FormLabel>
                      <Input name="search" placeholder="Search..." {...searchInput} mb={3} />
                      <List styleType="disc">
                        {data.products
                          .filter((p) =>
                            searchInput.value
                              .split(' ')
                              .some((word) => p.name.toLowerCase().includes(word.toLowerCase()))
                          )
                          .filter((p) => !added.includes(p.id))
                          .map((product) => (
                            <ListItem>
                              <IconButton
                                size="xs"
                                variantColor="blue"
                                icon="add"
                                aria-label="Add"
                                mr={2}
                                my={1}
                                onClick={add(product.id, data)}
                              />
                              {product.name}
                            </ListItem>
                          ))}
                      </List>
                    </Box>
                  )}

                  <Stack mt={5}>
                    {added
                      .map((id) => data.products.find((p) => p.id === id))
                      .map((product) => (
                        <Box borderWidth="1px" p={3}>
                          <Flex justifyContent="space-between">
                            <Stack>
                              <Heading fontSize="1em">{product.name}</Heading>
                              <FormLabel htmlFor={`amount[${product.id}]`}>Amount</FormLabel>
                              <Input
                                type="number"
                                name={`amount[${product.id}]`}
                                value={amounts[product.id]}
                                onChange={(e) =>
                                  setAmounts({ ...amounts, [product.id]: parseInt(e.target.value) })
                                }
                              />
                            </Stack>
                            <IconButton
                              variantColor="red"
                              icon="delete"
                              aria-label="delete"
                              onClick={remove(product.id, data)}
                              mr={3}
                            />
                          </Flex>
                        </Box>
                      ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" w="100%">
              <Stack isInline>
                <Button variantColor="cyan" onClick={toggleProducts}>
                  {showProducts ? 'Hide' : 'Show'} search
                </Button>
              </Stack>
              <Stack isInline>
                <Button variantColor="blue" onClick={onClose}>
                  Close
                </Button>
                <Button variantColor="green" onClick={onMainClick}>
                  {create ? 'Create' : 'Update'}
                </Button>
              </Stack>
            </Flex>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionItemModal;
